import { IToken, ITokenDTO } from "../interfaces/IToket";
import { Tokens } from "../models/token-model";

class TokenRepository {
  public async create(dto: ITokenDTO): Promise<IToken> {
    return await Tokens.create(dto);
  }
  public async findOneByParams(params: Partial<IToken>): Promise<IToken> {
    return await Tokens.findOne(params);
  }
  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Tokens.findOneAndDelete(params);
  }
  public async deleteByParams(params: Partial<IToken>): Promise<void> {
    await Tokens.deleteMany(params);
  }
}
export const tokenRepository = new TokenRepository();
