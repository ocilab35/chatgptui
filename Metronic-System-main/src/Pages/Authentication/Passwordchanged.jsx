import React from 'react'
import { Link } from 'react-router-dom'

function Passwordchanged() {
  return (
    <div>
 
  <style dangerouslySetInnerHTML={{__html: "\n   .page-bg {\n\t\t\tbackground-image: url('assets/media/images/2600x1200/bg-10.png');\n\t\t}\n\t\t.dark .page-bg {\n\t\t\tbackground-image: url('assets/media/images/2600x1200/bg-10-dark.png');\n\t\t}\n  " }} />
  <div className="min-h-screen flex items-center justify-center grow bg-center bg-no-repeat page-bg">
    <div className="card max-w-[440px] w-full">
      <div className="card-body p-10">
        <div className="flex justify-center mb-5">
          <img alt="image" className="dark:hidden max-h-[180px]" src="assets/media/illustrations/32.svg" />
          <img alt="image" className="light:hidden max-h-[180px]" src="assets/media/illustrations/32-dark.svg" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
          Your password is changed
        </h3>
        <div className="text-2sm text-center text-gray-700 mb-7.5">
          Your password has been successfully updated.
          <br />
          Your account's security is our priority.
        </div>
        <div className="flex justify-center">
          <Link className="btn btn-primary" to="/">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* End of Page */}
  {/* Scripts */}
  {/* End of Scripts */}
</div>

  )
}

export default Passwordchanged