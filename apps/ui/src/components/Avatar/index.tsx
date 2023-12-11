import BoringAvatar from 'boring-avatars';

type AvatarProps = {
  name: string;
  size?: number;
};

const Avatar = ({ name, size }: AvatarProps) => {
  return (
    <BoringAvatar
      size={size}
      name={name}
      variant="marble"
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  );
};

export default Avatar;
