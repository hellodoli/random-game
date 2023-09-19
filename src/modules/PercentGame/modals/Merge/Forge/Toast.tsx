import React from 'react'

const showToast = (isSuccess: boolean) => {
  const toaster = document.getElementById('forgeToaster')
  if (toaster) {
    toaster.innerHTML = isSuccess ? 'Success!!' : 'Fail!!'
    toaster.classList.add('animate__fadeInUp')
    toaster.classList.add(`text-${isSuccess ? 'success' : 'fail'}`)
  }
}

const Toast = () => {
  const clearAnimationToast = () => {
    const toaster = document.getElementById('forgeToaster')
    if (toaster) {
      toaster.classList.remove('animate__fadeInUp')
      toaster.classList.remove('text-success')
      toaster.classList.remove('text-fail')
      toaster.innerHTML = ''
    }
  }
  return (
    <div className="forge-toast">
      <span
        id="forgeToaster"
        className="forge-toast-text animate__animated animate__fast"
        onAnimationEnd={clearAnimationToast}
      ></span>
    </div>
  )
}

export { showToast }
export default Toast
