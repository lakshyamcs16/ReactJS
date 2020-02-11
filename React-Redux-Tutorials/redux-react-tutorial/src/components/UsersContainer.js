import React, { useEffect } from 'react'
import { fetchUsers } from '../redux/users/usersAction'
import { connect } from 'react-redux';

function UsersContainer({userData, fetchUsers}) {
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <div>
            {
                userData.loading?
                <h3>Loading...</h3>
                : userData.error ?
                <h3>userData.error</h3>
                : (
                    <div>
                        <h2>Users</h2> 
                        {
                            userData && userData.users.map(user => <p>{user.name} has email address {user.email}</p>)
                        }
                    </div>
                )
                
            }
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.users
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(UsersContainer)
