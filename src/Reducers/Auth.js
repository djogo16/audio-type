const initialState = {
    showAuthContainer: false,
    showLoginComponent: true,
    showRegisterComponent: false,
    isSideDrawerOpen: false,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null,
    errors: {},
  };
  
  
export default function auth(state=initialState, action) {
  
    switch (action.type) {

        case 'SET_SHOW_LOGIN':
            return {...state, showLoginComponent : true, showRegisterComponent: false };

        case 'SET_SHOW_REGISTER':
            return {...state, showRegisterComponent : true, showLoginComponent : false};
        
        case 'HIDE_AUTH_COMPONENT':
            return {...state, showAuthContainer : false }
        
        case 'SHOW_AUTH_COMPONENT' :
            return {...state, showAuthContainer: true, showLoginComponent : true} 

        case 'SHOW_SIDE_DRAWER' :
            return {...state, isSideDrawerOpen: true}
    
        case 'HIDE_SIDE_DRAWER' :
            return {...state, isSideDrawerOpen: false} 
     
        case 'USER_LOADING':
            return {...state, isLoading: true};
  
        case 'USER_LOADED':
            console.log(state.user)
            return {...state, isAuthenticated: true, isLoading: false, user: action.user};
  
        case 'LOGIN_SUCCESSFUL':
            localStorage.setItem("token", action.data.token);
            return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};
  
        case 'AUTHENTICATION_ERROR':
        case 'LOGIN_FAILED':
        case 'LOGOUT_SUCCESSFUL':
        case 'REGISTRATION_FAILED':
            localStorage.removeItem("token");
            return {...state, errors: action.data, token: null, user: null,
            isAuthenticated: false, isLoading: false};
        
        case 'LOGIN_SUCCESSFUL':
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.data.token);
            return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};
        
        default:
            return state;
    }
  }