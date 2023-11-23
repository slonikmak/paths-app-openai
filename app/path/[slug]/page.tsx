import styles from "@/app/page.module.css";

export default function Page({ params }: { params: { slug: string } }) {
    return <main className={styles.main}><h1>My Post: {params.slug}</h1></main>
}