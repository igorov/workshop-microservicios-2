import { RiskEntity } from '../entities/risk-entity';
import { logger } from '../utils/logger';

export const getRisk = async (customer: string): Promise<RiskEntity> => {
    const riskAPiURL = process.env.RISK_URL;
    
    // Consumir por GET el API de risk
    const response = await fetch(`${riskAPiURL}/credit-risk?customer=${customer}`);
    const data = await response.json();
    logger.info(`Respuesta del API de riesgo: ${JSON.stringify(data)}`);
    return data;
}
