import { useEffect, useState } from "react";

import { LoadingState } from "../../../types/types";
import {
  type EventFormValues,
  EventsServices,
  type GetEventsItem,
  type GetEventsResponse,
} from "../eventsService";
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
  };
};
export default useEventsTable;
