import { toast, TypeOptions } from 'react-toastify';

const ToastMessage = ({
  type,
  message,
}: {
  type: TypeOptions;
  message: string;
}) =>
  toast(
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>,
    {
      type,
    }
  );

export default ToastMessage;
