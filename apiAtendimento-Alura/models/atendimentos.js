const moment = require('moment');

const conexao = require('../infraestrtura/conections');
class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clientEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual',
            },
            {
                nome: 'cliente',
                valido: clientEhValido,
                mensagem: 'O nome do Cliente deve ter pelo menos cinco caracteres',
            }
        ]
        const errors = validacoes.filter(campo => !campo.valido);
        const existemErros = errors.length;

        if (existemErros) {
            res.status(400).json(errors);
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = 'INSERT INTO Atendimentos SET ?';
            conexao.query(sql, atendimentoDatado, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento)
                }
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (error, resultados) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        conexao.query(sql, (error, resultados) => {
            const atendimento = resultados[0];
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (error) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;