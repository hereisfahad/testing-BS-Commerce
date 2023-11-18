interface Props {
  height: string;
  width: string;
}

const WishlistIcon: React.FC<Props> = ({ height, width }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${height} ${width} fill-primary stroke-primary dark:fill-dark_primary dark:stroke-dark_primary`}
        viewBox="0 0 24 24"
        strokeWidth="1"
        data-tooltip-target="tooltip-right"
        data-tooltip-placement="right"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </>
  );
};

export default WishlistIcon;