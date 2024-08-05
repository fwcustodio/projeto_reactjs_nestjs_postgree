import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import InputDados from '../input_dados';

export const FuncionalidadesAcoes = (props) => {
  const { FuncionalidadesDisponiveis, FuncionalidadesSelecionadas, setFuncionalidadesSelecionadas, DISABILITAR_CAMPOS } = props;

  useEffect(() => {
    //console.log('FuncionalidadesDisponiveis', JSON.stringify(FuncionalidadesDisponiveis));
  }, []);

  const handleFuncionalidadeChange = (index, e) => {
    const FuncionalidadeId = e.target.value;
    if (FuncionalidadesSelecionadas.find((func) => func.funcionalidade_id === FuncionalidadeId)) {
      alert('Funcionalidade já adicionada. Remova a funcionalidade para adicionar novamente.');
      return;
    }

    const FuncionalidadeSelecionadaAux = FuncionalidadesDisponiveis.find((funcionalidade) => funcionalidade.id === FuncionalidadeId);
    const { acoes, ...rest } = FuncionalidadeSelecionadaAux;
    const FuncionalidadesAtualizadas = FuncionalidadesSelecionadas.map((func, i) =>
      i === index && FuncionalidadeSelecionadaAux ? { ...func, funcionalidade_id: FuncionalidadeId, acoes: acoes } : func,
    );
    setFuncionalidadesSelecionadas(FuncionalidadesAtualizadas);
  };

  const handleAcaoChange = (FuncIndex, AcaoIndex, e) => {
    const { value } = e.target;
    const AcoesAtualizadas = FuncionalidadesSelecionadas[FuncIndex].acoes.map((acao, i) => (i === AcaoIndex ? { ...acao, nome: value } : acao));
    const FuncionalidadesAtualizadas = FuncionalidadesSelecionadas.map((func, i) => (i === FuncIndex ? { ...func, acoes: AcoesAtualizadas } : func));
    setFuncionalidadesSelecionadas(FuncionalidadesAtualizadas);
  };

  const adicionarFuncionalidade = () => {
    setFuncionalidadesSelecionadas([...FuncionalidadesSelecionadas, { funcionalidade_id: 0, acoes: [] }]);
  };

  const removerFuncionalidade = (index) => {
    setFuncionalidadesSelecionadas(FuncionalidadesSelecionadas.filter((_, i) => i !== index));
  };

  const removerAcao = (FuncIndex, AcaoIndex) => {
    const AcoesAtualizadas = FuncionalidadesSelecionadas[FuncIndex].acoes.filter((_, i) => i !== AcaoIndex);
    const FuncionalidadesAtualizadas = FuncionalidadesSelecionadas.map((func, i) => (i === FuncIndex ? { ...func, acoes: AcoesAtualizadas } : func));

    setFuncionalidadesSelecionadas(FuncionalidadesAtualizadas);
  };

  return (
    <Box>
      {FuncionalidadesSelecionadas &&
        FuncionalidadesSelecionadas.map((funcionalidade, FuncIndex) => (
          <Box key={FuncIndex} mb={2} p={2} border={1} borderColor='grey.300' borderRadius={4}>
            <FormControl fullWidth margin='normal'>
              <InputDados
                select
                label='Funcionalidade'
                value={funcionalidade.funcionalidade_id}
                onChange={(e) => handleFuncionalidadeChange(FuncIndex, e)}
                size='small'
                disabled={DISABILITAR_CAMPOS}
              >
                {FuncionalidadesDisponiveis &&
                  FuncionalidadesDisponiveis.map((funcionalidade) => (
                    <MenuItem key={funcionalidade.id} value={funcionalidade.id}>
                      {funcionalidade.nome}
                    </MenuItem>
                  ))}
              </InputDados>
            </FormControl>
            {funcionalidade &&
              funcionalidade.acoes &&
              funcionalidade.acoes.map((acao, AcaoIndex) => (
                <Box key={AcaoIndex} display='flex' alignItems='center' mb={1} mt={1}>
                  <InputDados
                    label='Ação'
                    value={acao.nome}
                    size='small'
                    variant='standard'
                    disabled={true}
                    inputProps={{ style: { fontSize: 14 } }}
                    //InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                  {!DISABILITAR_CAMPOS && (
                    <IconButton onClick={() => removerAcao(FuncIndex, AcaoIndex)}>
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              ))}
            <Box mt={2}>
              <Button
                style={{ marginTop: 20 }}
                variant='outlined'
                color='secondary'
                startIcon={<Delete />}
                onClick={() => removerFuncionalidade(FuncIndex)}
                size='small'
                disabled={DISABILITAR_CAMPOS}
              >
                Remover Funcionalidade
              </Button>
            </Box>
          </Box>
        ))}
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={adicionarFuncionalidade}
        fullWidth
        size='small'
        style={{ marginTop: 15, marginBottom: 30 }}
        disabled={DISABILITAR_CAMPOS}
      >
        Adicionar Funcionalidade
      </Button>
    </Box>
  );
};

export default FuncionalidadesAcoes;
