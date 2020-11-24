import { h } from 'preact'
import { Link } from 'preact-router'
import { PageProps } from '.'

export default (_props: PageProps) => (
  <section className="section">
    <h1 className="title">Sorry</h1>
    <h2 className="subtitle">The Page you are looking for does not exist.</h2>
    <Link href="/">go to the landing page</Link>
  </section>
)
