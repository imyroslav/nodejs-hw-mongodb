const parseContactType = (contactType) => {
  const isString = typeof contactType === "string";
  if (!isString) return;
  const isContactType = (contactType) => ["work", "home", "personal"].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
    const isString = typeof isFavourite === "string";
    if (!isString) return;
    
    const parsedIsFavourite = isFavourite.toLowerCase();
  if (parsedIsFavourite === "true") {
    return true;
  } else if (parsedIsFavourite === "false") {
    return false;
  }
    return undefined;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite
    }
};