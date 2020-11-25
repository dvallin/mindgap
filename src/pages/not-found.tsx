import { h } from 'preact'
import { PageProps } from '.'
import Link from '../link'

export default (_props: PageProps) => (
  <section className="section">
    <h1 className="title">Sorry</h1>
    <h2 className="subtitle">The Page you are looking for does not exist.</h2>
    <Link path="/">go to the landing page</Link>
  </section>
)
