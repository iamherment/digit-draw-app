import { Controller, Get } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultDto } from './result.dto';

@Controller('result')
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

        @Get('getResults')
        async getResults(): Promise<ResultDto[]>{
            return this.resultService.getResults()
        }

}

