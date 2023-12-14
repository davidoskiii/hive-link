import { sidebarLinks } from '@/constants'
import { useUserContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { INavLink } from '@/types'
import { link } from 'fs'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import Loader from './Loader'

function LeftSideBar() {
    const { pathname } = useLocation()
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const { user, isLoading } = useUserContext()

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img src="/assets/images/icon.svg" alt="logo" height={64} width={64} /><h1 className=" text-2xl custom-grandista-regular">Hive Link</h1>
                </Link>
                {isLoading || !user.email ? (
                <div className="h-14">
                    <Loader />
                </div>
                ) : (
                    <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                        <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="h-14 w-14 rounded-full"
                        />
                        <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">@{user.username}</p>
                        </div>
                    </Link>
                )}

                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && "invert-white"}`}/>
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <li className={`leftsidebar-link group`}>
                <Button variant="ghost" className='flex gap-4 items-center p-4 py-7' onClick={() => signOut()}>
                    <img src="/assets/icons/logout.svg" alt="logout" className='group-hover:invert-white'/><p className='small-medium lg:base-medium'>Logout</p>
                </Button>
            </li>
        </nav>
    )
}

export default LeftSideBar