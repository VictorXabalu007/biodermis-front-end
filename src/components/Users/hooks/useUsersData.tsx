import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service/getUsers";
import {
  UserAddress,
  UserCredentials,
} from "../../../@types/UserData/UserData";
import { getAddress } from "../service/getAddress";
import { UserStatus } from "../../../@types/UserStatus/StatusType";

export const useUsersData = () => {
  const { data, isLoading } = useQuery<UserCredentials[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: address } = useQuery<UserAddress[]>({
    queryKey: ["user-address"],
    queryFn: getAddress,
  });

  const [users, setUsers] = useState<UserCredentials[]>([]);
  const [userAddress, setUserAddress] = useState<UserAddress[]>([]);

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (data && userAddress) {
      setUsers(
        data.map((d) => {
          const hasAddress = userAddress.find((add) => add.usuario_id === d.id);

          if (hasAddress) {
            return {
              ...d,
              ...hasAddress,
              addressId: hasAddress.id,
              status: d.status.toLocaleLowerCase() as UserStatus,
            };
          } else {
            return {
              ...d,
              status: d.status.toLocaleLowerCase() as UserStatus,
            };
          }
        })
      );
    }
  }, [data, userAddress, address]);

  return {
    users,
    setUsers,
    isLoading,
  };
};
