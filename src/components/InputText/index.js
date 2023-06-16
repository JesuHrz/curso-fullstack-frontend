import classNames from "classnames"

export function InputText ({ className, errorMessage = null, ...props }) {
  return (
    <div className='min-h-[72px]'>
      <input
        className={classNames('input-text', className)}
        {...props}
      />
      { errorMessage && <span className="text-sm text-red-500 ml-1"></span>}
    </div>
  )
}
