with
    tech_cte
    as
    (
        select t.id
        from technologies as t
            left join ProjectTechnology as pt on t.id = pt.technologyId
        where pt.projectId is null
    )
delete from technologies
where id
in tech_cte