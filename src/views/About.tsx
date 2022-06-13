import classnames from 'classnames'
import s from './About.module.scss'
const About = () => {
  return (
    <div className={classnames(s.wrapper, s.test_clns)}>This is About Page</div>
  )
}
export default About
