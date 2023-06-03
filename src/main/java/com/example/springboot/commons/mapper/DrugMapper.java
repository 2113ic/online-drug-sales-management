package com.example.springboot.commons.mapper;

import com.example.springboot.commons.domain.Drug;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugMapper {
  int deleteByPrimaryKey(String did);

  int insert(Drug record);

  int insertSelective(Drug record);

  Drug selectByPrimaryKey(String did);

  int updateByPrimaryKeySelective(Drug record);

  int updateByPrimaryKey(Drug record);

  //批量插入
  int insertBatch(List<Drug> list);

  //根据类型查询药物
  List<Drug> selectDrugByType(String type);

  //根据药物名称查询
  List<Drug> selectDrugByName(String name);

  //根据主治功能查询
  List<Drug> selectDrugByFunction(String function);

  List<Drug> selectAll(Integer begin, Integer size);

  //判断库存是否小于某个值
  List<Drug> selectDrugByCount(long count);

  //查询记录数
  int selectCount();

  /**
   * 根据购物车id，查询药物信息
   * @param cartIds
   * @return
   */
  List<Drug> selectDrugByCartIds(@Param("cartIds") String[] cartIds);
}