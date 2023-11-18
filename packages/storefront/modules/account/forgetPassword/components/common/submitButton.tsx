import useTranslation from 'next-translate/useTranslation';

const FormSubmitButton = () => {
  const { t } = useTranslation();

  return (
    <>
      <button
        type="submit"
        id="submit"
        className="my-2 w-full rounded bg-primary py-2 text-white hover:bg-black dark:bg-dark_primary sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4"
      >
        {t('common:submit')}
      </button>
    </>
  );
};

export default FormSubmitButton;
