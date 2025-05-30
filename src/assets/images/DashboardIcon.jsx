import React from 'react'

const DashboardIcon = ({className,iconClr}) => {
  return (
    <svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 24 24"><g fill="none" stroke={iconClr} strokeWidth="1.5"><path strokeLinecap="round" d="M14.5 6.5h3m0 0h3m-3 0v3m0-3v-3"></path><path d="M2.5 6.5c0-1.886 0-2.828.586-3.414S4.614 2.5 6.5 2.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 8.386 2.5 6.5Zm11 11c0-1.886 0-2.828.586-3.414s1.528-.586 3.414-.586s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586s-.586-1.528-.586-3.414Z"></path><path d="M2.5 17.5c0-1.886 0-2.828.586-3.414S4.614 13.5 6.5 13.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 19.386 2.5 17.5Z"></path></g></svg>
  )
}

export default DashboardIcon
