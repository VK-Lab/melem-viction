import Image from 'next/future/image';
import Link from 'next/link';

import Logo from '~/public/img/logo.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GLogo = (props: any) => {
  return (
    <div
      {...props}
      className="melem--logo"
      style={{ height: 64, textAlign: 'center', padding: '10px 0' }}
    >
      <Link href={`/`}>
        <Image alt="logo" src={Logo} style={{ height: 'auto', width: 54 }} />
      </Link>
    </div>
  );
};

export default GLogo;
