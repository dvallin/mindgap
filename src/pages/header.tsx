import { h } from 'preact'
import Link from '../link'
import { useApplicationState } from '../state'

import icon from '../assets/icons/large.svg'

export default () => {
  const [state] = useApplicationState()
  const batches = Object.values(state.batches).length
  const batchesDone = Object.values(state.batches).filter(b => b.done).length
  const recipes = Object.values(state.recipes).length
  return (
    <section className="section">
      <nav className="level is-mobile">
        <div className="level-item has-text-centered">
          <Link path="/batches" params={{ done: 'false' }}>
            <p className="heading">Active</p>
            <p className="title">{batches - batchesDone}</p>
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <Link path="/batches" params={{ done: 'true' }}>
            <p className="heading">Done</p>
            <p className="title">{batchesDone}</p>
          </Link>
        </div>
        <p className="level-item has-text-centered">
          <Link path="/">
            <img src={icon as string} alt="Mindgap" width="50" height="50" style={{ height: '50px' }} />
          </Link>
        </p>
        <div className="level-item has-text-centered">
          <Link path="/batches">
            <p className="heading">Batches</p>
            <p className="title">{batches}</p>
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <Link path="/recipes">
            <p className="heading">Recipes</p>
            <p className="title">{recipes}</p>
          </Link>
        </div>
      </nav>
    </section>
  )
}
