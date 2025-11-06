import { AnimatePresence, motion } from 'framer-motion'
import { Clapperboard, Film, House, Menu, Users, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { useModalSearchStore } from '@/app/stores/useModalSearchStore'
import { Logo } from '../Logo'
import { SearchBtn } from '../SearchBtn'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { Button } from '../ui/button'

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { isOpen } = useModalSearchStore()

  const links = [
    { name: 'Home', href: '/', icon: <House /> },
    { name: 'Filmes', href: '/movies', icon: <Film /> },
    { name: 'Series', href: '/series', icon: <Clapperboard /> },
    { name: 'Pessoas', href: '/people', icon: <Users /> },
  ]

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setMenuIsOpen(false)
  }, [location.pathname])

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false)
      }
    }

    if (menuIsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuIsOpen])

  // Bloqueia scroll do body quando menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuIsOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuIsOpen])

  useEffect(() => {
    if (isOpen) setMenuIsOpen(false)
  }, [isOpen])

  return (
    <header className='p-4 sticky top-0 border-b  z-50 bg-background '>
      <div className=' flex items-center justify-between '>
        {/* Logo */}
        <Logo size='xl' />

        {/* Navegação Desktop */}
        <nav className='hidden lg:flex gap-4'>
          {links.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `${
                  isActive ? 'text-red-500 font-semibold' : ''
                } flex items-center gap-2 px-4 py-2 transition-colors duration-200 hover:text-red-500`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Ações */}
        <div className='flex items-center gap-2'>
          {/* Desktop */}
          <div className='hidden lg:flex gap-2'>
            <SearchBtn />
            <ThemeSwitcher />
          </div>

          {/* Mobile */}
          <div className='flex lg:hidden items-center gap-2'>
            <SearchBtn />

            <Button
              variant='ghost'
              onClick={() => setMenuIsOpen(!menuIsOpen)}
              className='border cursor-pointer'
            >
              {menuIsOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Menu lateral (mobile) */}
        <AnimatePresence>
          {menuIsOpen && (
            <>
              {/* Fundo escurecido */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-40'
              />

              {/* Drawer lateral */}
              <motion.aside
                ref={menuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 240, damping: 25 }}
                className='fixed top-0 right-0 h-full w-64 bg-background border-l border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col gap-6 p-6 z-50 lg:hidden'
              >
                {/* Cabeçalho do menu */}
                <div className='flex justify-between items-center border-b border-slate-300 dark:border-slate-700 pb-4'>
                  <h3 className='font-semibold text-2xl text-red-500'>MENU</h3>

                  <div className='space-x-2'>
                    <ThemeSwitcher />
                    <Button
                      variant='ghost'
                      size='icon'
                      className='border'
                      onClick={() => setMenuIsOpen(false)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>

                {/* Links */}
                <nav className='flex flex-col gap-6 mt-4'>
                  {links.map(link => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      className={({ isActive }) =>
                        `${
                          isActive ? 'text-red-500 font-semibold' : ''
                        } flex items-center gap-3 text-lg transition-colors duration-200 hover:text-red-500 border p-2 rounded-lg`
                      }
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  ))}
                </nav>

                {/* Busca */}
                {/* <div className="mt-auto border-t border-slate-300 dark:border-slate-700 pt-4 flex">
                  <SearchBtn />
                </div> */}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
