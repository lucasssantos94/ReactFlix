export const ContainerGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
      {children}
    </div>
  )
}
