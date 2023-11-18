import CheckCircleOutlineIcon from '@/modules/common/icons/checkCircleIcon';

interface Props {
  status: string;
}

const OrderStatus: React.FC<Props> = ({ status }: Props) => {
  const statusIndex: number =
    status === 'Pending'
      ? 2
      : status === 'Processing'
      ? 3
      : status === 'Completed'
      ? 4
      : 5;

  const coloredBorder =
    'bg-primary border-primary dark:bg-dark_primary dark:border-dark_primary';
  const fadedBorder = 'bg-gray-100 border-gray-100';
  const redBorder = 'bg-red-400 border-red-400';

  return (
    <div className="mt-5 w-full rounded-lg border">
      <div className="flex justify-between px-5 py-10">
        <div className="flex flex-grow flex-col items-center">
          <div className="flex w-full items-center">
            <hr className="flex-grow opacity-0"></hr>
            <CheckCircleOutlineIcon
              fill={statusIndex >= 1 ? '#7CD871' : '#E4EAF1'}
            />
            <hr className={`flex-grow  border ${coloredBorder}`}></hr>
          </div>
          <span>Ordered</span>
        </div>
        <div className="flex flex-grow flex-col items-center">
          <div className="flex w-full items-center">
            <hr className={`flex-grow  border ${coloredBorder}`}></hr>
            <CheckCircleOutlineIcon
              fill={statusIndex >= 2 ? '#7CD871' : '#E4EAF1'}
            />
            <hr
              className={`flex-grow  border ${
                statusIndex > 2 ? coloredBorder : fadedBorder
              }`}
            ></hr>
          </div>
          <span>Pending</span>
        </div>
        <div className="flex flex-grow flex-col items-center">
          <div className="flex w-full items-center">
            <hr
              className={`flex-grow  border ${
                statusIndex >= 3 ? coloredBorder : fadedBorder
              }`}
            ></hr>
            <CheckCircleOutlineIcon
              fill={statusIndex >= 3 ? '#7CD871' : '#E4EAF1'}
            />
            <hr
              className={`flex-grow  border ${
                statusIndex === 5
                  ? redBorder
                  : statusIndex > 3
                  ? coloredBorder
                  : fadedBorder
              }`}
            ></hr>
          </div>
          <span>Processing</span>
        </div>
        {statusIndex === 5 ? (
          <div className="flex flex-grow flex-col items-center">
            <div className="flex w-full items-center">
              <hr className="flex-grow border border-red-400 bg-red-500"></hr>
              <CheckCircleOutlineIcon fill="#FF705B" />
              <hr className="flex-grow border border-green-500 opacity-0"></hr>
            </div>
            <span>Cancelled</span>
          </div>
        ) : (
          <div className="flex flex-grow flex-col items-center">
            <div className="flex w-full items-center">
              <hr
                className={`flex-grow  border ${
                  statusIndex === 4 ? coloredBorder : fadedBorder
                }`}
              ></hr>
              <CheckCircleOutlineIcon
                fill={statusIndex === 4 ? '#7CD871' : '#E4EAF1'}
              />
              <hr className="flex-grow border border-green-500 bg-green-500 opacity-0"></hr>
            </div>
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
