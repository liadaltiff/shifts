import axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { ShiftContext } from "../../contexts/ShiftContext";
import { UsersContext } from "../../contexts/UsersContext";
import { User } from "../../types/user.interface";
import { responseOk } from "../../utils/axios.util";
import "sweetalert2/src/sweetalert2.scss";

interface ShiftDetails {
  name: string;
  person: User;
  time: {
    start: string;
    end: string;
  };
}

export const useMakeShift = (date: Date | undefined) => {
  const { stateShift, setStateShift } = useContext(ShiftContext);
  const { stateUsers } = useContext(UsersContext);

  const defaultDetails: ShiftDetails = {
    name: "",
    person: {} as User,
    time: {
      start: "",
      end: "",
    },
  };

  const [details, setDetails] = useState(defaultDetails);

  const handleChange = (key: string, value: any) => {
    setDetails((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleTimeChange = (key: "start" | "end", e: any) => {
    setDetails((prev) => {
      return {
        ...prev,
        time: {
          ...prev.time,
          [key]: e.target.value,
        },
      };
    });
  };

  const handlePersonChange = (id: string) => {
    const person = stateUsers.find((user) => user._id === id);
    handleChange("person", person);
  };

  const parseDetails = () => {
    return {
      shiftDate: date,
      shiftName: details.name,
      shiftPerson: details.person?.fullName,
      shiftPersonId: details.person?._id,
      startTimeValue: details.time.start,
      endTimeValue: details.time.end,
    };
  };

  const createShift = useCallback(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/shifts",
          parseDetails(),
          {
            withCredentials: true,
          }
        );

        Swal.fire({
          icon: "success",
          title: "התורנות נוצרה בהצלחה",
          showConfirmButton: false,
          timer: 1500,
        });

        if (!responseOk(response)) {
          throw new Error("response error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendRequest();
  }, [date, details]);

  useEffect(() => {
    if (stateShift) {
      const userINeed = stateUsers.find(
        (user) => user._id === stateShift.shiftPersonId
      );

      setDetails({
        name: stateShift.shiftName,
        person: userINeed!,
        time: {
          start: stateShift.startTimeValue,
          end: stateShift.endTimeValue,
        },
      });
    } else {
      setDetails(defaultDetails);
    }
  }, [stateShift]);

  useEffect(() => {
    setStateShift(undefined);
    setDetails(defaultDetails);
  }, []);

  return {
    form: {
      data: details,
      setField: handleChange,
      setTimeField: handleTimeChange,
      setPersonField: handlePersonChange,
      post: createShift,
      users: stateUsers,
    },
  };
};
