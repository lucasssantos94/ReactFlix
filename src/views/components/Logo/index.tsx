import { Link } from 'react-router'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Logo = ({ size = 'md' }: LogoProps) => {
  const sizeMap = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }
  return (
    <Link to='/'>
      <h3
        className={`text-red-500 font-bold -tracking-widest ${sizeMap[size]}`}
      >
        REACTFLIX
      </h3>
    </Link>
  )
}
