import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import type { TrpcRouterOutput } from '@ideanick/backend/src/router';
import { trpc } from '../../lib/trpc';
import { useFormik } from 'formik';
import { useState } from 'react';
import { withZodSchema } from 'formik-validator-zod';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input';

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }

      return result;
    },
    {} as Pick<T, K>
  );
}

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate();

  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updateIdea = trpc.updateIdea.useMutation();

  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);

        await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
        navigate(getViewIdeaRoute({ ideaNick: values.nick }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;
  const me = getMeResult.data.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};
