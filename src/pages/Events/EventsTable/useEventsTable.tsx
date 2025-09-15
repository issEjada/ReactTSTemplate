import { useEffect, useState } from "react";

import { LoadingState } from "../../../types/types";
import {
  type EventFormValues,
  EventsServices,
  type GetEventsItem,
  type GetEventsResponse,
  type UpdateEventPayload,
} from "../eventsServices";
import { cleanObject } from "../../../utils/helpers";
// import { formatTime } from "../../../helpers";

const useEventsTable = () => {
  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Loading
  );
  const [data, setData] = useState<GetEventsItem[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<EventFormValues | undefined>(
    undefined
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenDrawer = () => {
    setIsFilterOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterOpen(false);
  };

  const handleSearchSubmit = (searchData: EventFormValues) => {
    const filteredData = cleanObject(searchData);
    setFilters(filteredData as EventFormValues);
    setCurrentPage(1);
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    setloadingState(LoadingState.Loading);
    const newStatus = currentStatus === "ENABLED" ? "DISABLED" : "ENABLED";
    const payload: UpdateEventPayload = {
      status: newStatus,
    };

    try {
      await EventsServices.updateEvent(payload, id);
      await fetchEventData();
      setloadingState(LoadingState.Success);
    } catch (err) {
      console.error("Failed to update decision rule status:", err);
      // setError("Failed to update decision rule status.");
      setloadingState(LoadingState.Error);
    }
  };

  const fetchEventData = async () => {
    setloadingState(LoadingState.Loading);
    await EventsServices.getEventData({
      page: currentPage,
      maxPageSize: itemsPerPage,
      ...filters,
    })
      .then((result: GetEventsResponse) => {
        setData(result.data.events || []);
        setTotalCount(
          result.meta?.totalPages ? result.meta.totalPages * itemsPerPage : 0
        );

        setloadingState(LoadingState.Success);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPopupType("errorModal");
        setPopupMessage(error);
        setIsPopupOpen(true);
        setloadingState(LoadingState.Error);
        setFilters(undefined);
      });
  };

  useEffect(() => {
    fetchEventData();
  }, [currentPage, itemsPerPage, filters]);

  return {
    loadingState,
    data,
    totalCount,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSearchSubmit,
    isFilterOpen,
    isPopupOpen,
    popupMessage,
    popupType,
    setIsPopupOpen,
    setPopupMessage,
    setPopupType,
    handleToggleStatus,
  };
};
export default useEventsTable;
