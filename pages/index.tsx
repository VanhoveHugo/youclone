'use strict'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import _ from 'lodash'

import Layout from '../components/layout'
import Thumbnail from '../components/thumbnail'

import type { videosList } from '../utils/types'

export default function Home({ videos }: videosList) {
  return (
    <>
      <Head>
        <title>YouClone</title>
        <meta name="description" content="Profitez des vidéos et de la musique que vous aimez, mettez en ligne des contenus originaux, et partagez-les avec vos amis, vos proches et le monde entier." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout ariane menu={true}>
        {
          _.times(videos?.length, (i: any) => (
            <Thumbnail data={videos[i]} key={i} />
          ))
        }
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://youclone.vercel.app/api/youtube`)
  let data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  let videos = data.items
  return {
    props: { videos },
  }
}