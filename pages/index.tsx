import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/modal'

export default function Home() {
  
  return (
    <div className=' bg-white dark:bg-gray-800'>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navbar */}
        <Header/>
      {/* Feed */}
        <Feed/>
      {/* Modal */}
        <Modal/>
      {/* */}
    </div>
    </div>
  )
}