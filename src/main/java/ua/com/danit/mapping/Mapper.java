package ua.com.danit.mapping;

import ua.com.danit.dto.AbstractDto;
import ua.com.danit.entity.AbstractEntity;

// https://github.com/promoscow/modelmapper-demo
public interface Mapper<E extends AbstractEntity, D extends AbstractDto> {
  E toEntity(D dto);
  D toDto(E entity);
}
