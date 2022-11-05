import Link from 'next/link'
import { useRouter } from 'next/router'

function Header() {
  const router = useRouter()
  return (
    <header className="flex flex-wrap">
      <section className="relative w-full mx-auto">
        <nav className="flex justify-between h-20 text-white bg-[#102A3A]">
          <div className="flex items-center px-5 py-6 xl:px-12">
            <Link href="/" passHref legacyBehavior>
              <a>
                <img src={`${router.basePath}/recustomer_logo.svg`} alt="" />
              </a>
            </Link>
          </div>
        </nav>
      </section>
    </header>
  )
}

export default Header
