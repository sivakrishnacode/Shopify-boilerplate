import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const formattedErr = errors.reduce((accumulator, error) => {
      accumulator[error.property] = Object.values(error.constraints).join(', ');
      return accumulator;
    }, {});

    throw new BadRequestException(formattedErr);
  },
};

export default validationPipeOptions;
