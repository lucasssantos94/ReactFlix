export const ContainerGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-6 '>
      {children}
    </div>
  )
}
