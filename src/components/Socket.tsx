import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../contexts/Socket';
import { AppState } from '../redux/rootReducer';
import { AuthState } from '../interfaces/user';
import { Role } from '../enums/roles';
// ----------------------------------------------------------------------

export const Socket = () => {
  const socket = useContext(SocketContext);
  const { isAuthenticated, user } = useSelector<AppState, AuthState>(state => state.auth);
  let id, officeId, role;

  if (isAuthenticated) {
    id = user.id;
    officeId = user.officeId;
    role = user.role;
  }

  useEffect(() => {
    let listenOn: string = null;
    if (role === Role.ADMIN) {
      socket.onAny(data => {
        console.log('Viendo todo como administrador', data);
      });
    } else if (role === Role.OPERATOR) {
      console.log('Viendo como operador');

      listenOn = `new_draft_order_created_office_${officeId}`;
      socket.on(listenOn, data => {
        console.log(data);
        alert(JSON.stringify(data));
      });
    } else if (role === Role.CASHIER) {
      console.log('Viendo como cajero');
      listenOn = `request_payment_${officeId}`;

      socket.on(listenOn, data => {
        console.log(data);
        alert(JSON.stringify(data));
      });
    }

    return () => {
      socket.off(listenOn);
    };
  }, [id, officeId, role, Role]);

  return null;
};
