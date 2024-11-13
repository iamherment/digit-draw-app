import { ResultService } from './result.service';
import { ResultDto } from './result.dto';
export declare class ResultController {
    private readonly resultService;
    constructor(resultService: ResultService);
    getResults(): Promise<ResultDto[]>;
}
