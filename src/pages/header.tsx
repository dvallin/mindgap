import { h } from 'preact'
import { Link } from 'preact-router'
import { useApplicationState } from '../state'

import icon from '../assets/icons/large.svg'

export default () => {
  const [state] = useApplicationState()
  const batches = Object.values(state.batches).length
  const batchesDone = Object.values(state.batches).filter(b => b.done).length
  const recipes = Object.values(state.recipes).length
  return (
    <section className="section">
      <nav className="level">
        <div className="level-item has-text-centered">
          <Link href="/batches?done=false">
            <p className="heading">Active</p>
            <p className="title">{batches - batchesDone}</p>
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <Link href="/batches?done=true">
            <p className="heading">Done</p>
            <p className="title">{batchesDone}</p>
          </Link>
        </div>
        <p className="level-item has-text-centered">
          <Link href="/">
            <img src={icon} alt="Mindgap" style={{ height: '60px' }} />
          </Link>
        </p>
        <div className="level-item has-text-centered">
          <Link href="/batches">
            <p className="heading">Batches</p>
            <p className="title">{batches}</p>
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <Link href="/recipes">
            <p className="heading">Recipes</p>
            <p className="title">{recipes}</p>
          </Link>
        </div>
      </nav>
    </section>
  )
}
