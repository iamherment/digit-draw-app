import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { Bet } from '../bet/bet.entity';
import { ResultDto } from './result.dto';
export declare class ResultService {
    private resultRepository;
    private betRepository;
    constructor(resultRepository: Repository<Result>, betRepository: Repository<Bet>);
    getResults(): Promise<ResultDto[]>;
}
