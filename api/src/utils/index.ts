export const getArrayUpdateOperations = (
  oldArray: { id: any }[],
  newArray: { id: any }[],
) => {
  if (!newArray || newArray.length === 0) {
    return { set: [] };
  }

  if (!oldArray || oldArray.length === 0) {
    oldArray = [];
  }

  const oldIds = new Set(oldArray.map((item) => item.id));
  const newIds = new Set(newArray.map((item) => item.id));

  const connect = Array.from(newIds)
    .filter((id) => !oldIds.has(id))
    .map((id) => ({ id }));

  const disconnect = Array.from(oldIds)
    .filter((id) => !newIds.has(id))
    .map((id) => ({ id }));

  return {
    connect,
    disconnect,
  };
};
