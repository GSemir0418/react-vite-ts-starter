import s from './Button.module.scss'
const Button = (props: any) => {
  return (
    <div className={s.wrapper}>
      <div className={s.button}>{props.children}</div>
    </div>
  )
}
export default Button
