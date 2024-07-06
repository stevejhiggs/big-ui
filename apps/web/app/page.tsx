import { Badge, Switch } from '@repo/shadcn';
import { Button } from '@repo/shadcn';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <Button asChild>
            <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
              Deploy now
            </a>
          </Button>
          <Button asChild variant={'secondary'}>
            <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              Read our docs
            </a>
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/file-text.svg" alt="File icon" width={16} height={16} />
          Learning
        </a>
        <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.or2g →
        </a>
        <div className="text-blue-500 m-2">
          hi
          <Badge>hello</Badge>
          <Switch />
        </div>
      </footer>
    </div>
  );
}
