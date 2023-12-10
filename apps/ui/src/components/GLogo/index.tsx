import Image from 'next/future/image';

import Logo from '~/public/img/logo.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GLogo = (props: any) => {
  return (
    <div
      {...props}
      className="d2e--logo"
      style={{ height: 64, textAlign: 'center', padding: '10px 0' }}
    >
      <Image alt="logo" src={Logo} style={{ height: 'auto', width: 54 }} />
    </div>
  );
};

export default GLogo;
