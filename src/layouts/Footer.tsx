import { AppConfig } from '@/utils/AppConfig'

export default function Footer() {
  return (
    <footer className="py-8 text-sm text-center border-t border-gray-300">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
      <span role="img" aria-label="Love">
        ♥
      </span>{' '}
      by <a href="https://creativedesignsguru.com">QuangKhaiPtit</a>
    </footer>
  )
}
