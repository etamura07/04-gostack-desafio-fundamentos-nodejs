import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsWithBalanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsWithBalanceDTO {
    const transactionsWithBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactionsWithBalance;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((sum: number, record) => {
        return sum + Number(record.value);
      }, 0);

    const outcomeSum = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((sum: number, record) => {
        return sum + Number(record.value);
      }, 0);

    const total = incomeSum - outcomeSum;

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
