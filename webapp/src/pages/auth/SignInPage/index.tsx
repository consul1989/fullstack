import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import Cookies from 'js-cookie';
import { FormItems } from '../../../components/FormItems';
import { Input } from '../../../components/Input';
import { Segment } from '../../../components/Segment';
import { trpc } from '../../../lib/trpc';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { zSignInTrpcInput } from '@ideanick/backend/src/router/auth/signIn/input';

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const trpcUtils = trpc.useContext();

  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: async (values: any) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });

      void trpcUtils.invalidate();
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
