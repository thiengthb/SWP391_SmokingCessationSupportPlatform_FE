import { Outlet } from 'react-router-dom'
import Navbar from './header/navbar'
import Footer from './footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='max-w-[1248px] bg-background text-foreground xl:mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout