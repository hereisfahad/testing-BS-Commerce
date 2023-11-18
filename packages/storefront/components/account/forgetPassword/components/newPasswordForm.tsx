import { Form, Formik } from 'formik';
import { passwordSchema } from '@/components/global/schemas/forgot-password.schema';

import FormCancelButton from '@/components/account/forgetPassword/components/common/cancelButton';
import FieldTemplate from '@/components/account/forgetPassword/components/common/fieldTemplate';
import FormSubmitButton from '@/components/account/forgetPassword/components/common/submitButton';
import { useAppSelector } from 'customHooks/hooks';
import { Input } from 'atomic-components';
import LockIcon from '../../icons/lock';

interface Props {
  handleNewPasswordFormSubmit: Function;
}

const NewPasswordForm: React.FC<Props> = ({ handleNewPasswordFormSubmit }) => {
  const otpDetail = useAppSelector(
    (state) => state.persistedReducer.forgetPassword
  );

  return (
    <>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={(values, actions) => {
          let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
          const isEmail = regex.test(otpDetail.username);
          let data;
          isEmail
            ? (data = {
                email: otpDetail.username,
                password: values.newPassword,
              })
            : (data = {
                phone: otpDetail.username,
                password: values.newPassword,
              });
          handleNewPasswordFormSubmit(data);
          actions.setSubmitting(false);
        }}
        validationSchema={passwordSchema}
      >
        {(formikprops) => {
          const { errors, touched } = formikprops;
          return (
            <Form onSubmit={formikprops.handleSubmit}>
              <div className="mb-4">
                <>
                  {/* <FieldTemplate
                    fieldType="password"
                    fieldID="newPassword"
                    placeholder="New password"
                    extraClass="mb-4"
                  />
                  <FieldTemplate
                    fieldType="password"
                    fieldID="confirmPassword"
                    placeholder="Retype new password"
                  /> */}
                  <Input
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    type="password"
                    icon={<LockIcon />}
                    id="confirmPassword"
                    required={true}
                    placeholder="confirmPassword"
                  />
                  <br />
                  <Input
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    type="password"
                    icon={<LockIcon />}
                    id="confirmPassword"
                    required={true}
                    placeholder="Retype new password"
                  />
                </>
              </div>

              <div className="flex flex-wrap justify-end sm:justify-end md:justify-between lg:justify-between xl:justify-between">
                <FormSubmitButton />

                <FormCancelButton />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default NewPasswordForm;
