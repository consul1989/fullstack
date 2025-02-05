import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import Cookies from 'js-cookie';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { getAllIdeasRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { withZodSchema } from 'formik-validator-zod';
import { zSignInTrpcInput } from '@ideanick/backend/src/router/signIn/input';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();

  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        const { token } = await signIn.mutateAsync(values);
        Cookies.set('token', token, { expires: 99999 });

        void trpcUtils.invalidate();
        navigate(getAllIdeasRoute());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
